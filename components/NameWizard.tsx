"use client";

import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef, useState } from "react";
import { BirthDatePicker } from "@/components/BirthDatePicker";
import { Turnstile } from "@/components/Turnstile";
import {
  namingStyles,
  qualities,
  type NameProfile,
  type NamingStyle,
  type Quality,
} from "@/lib/types";

const qualityLabels: Record<Quality, string> = {
  calm: "Calm",
  wise: "Wise",
  strong: "Strong",
  elegant: "Elegant",
  warm: "Warm",
  creative: "Creative",
  free_spirited: "Free-spirited",
  ambitious: "Ambitious",
  mysterious: "Mysterious",
  joyful: "Joyful",
};

const styleCopy: Record<NamingStyle, { label: string; description: string }> = {
  natural_modern: {
    label: "Natural & modern",
    description: "Familiar in contemporary Chinese, with a clean and current feel.",
  },
  classical_poetic: {
    label: "Classical & poetic",
    description: "Literary in tone while remaining credible as a modern name.",
  },
  philosophical: {
    label: "Philosophical",
    description: "Quiet ideas such as clarity, balance, awareness, and openness.",
  },
  close_to_original: {
    label: "Close to my original name",
    description: "A stronger sound or meaning connection where Chinese usage allows.",
  },
  balanced: {
    label: "Balanced mix",
    description: "Natural usage first, with a gentle blend of sound and meaning.",
  },
};

const initialProfile: NameProfile = {
  firstName: "",
  familyName: "",
  genderExpression: "no_preference",
  birthDate: "",
  birthTimePeriod: "unknown",
  qualities: [],
  namingStyle: "balanced",
  daoistPerspective: false,
  buddhistPerspective: false,
};

type ApiError = { error?: string };

export function NameWizard() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<NameProfile>(initialProfile);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [challengeKey, setChallengeKey] = useState(0);
  const handleToken = useCallback((token: string) => setTurnstileToken(token), []);

  function update<K extends keyof NameProfile>(key: K, value: NameProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggleQuality(quality: Quality) {
    const selected = profile.qualities.includes(quality);
    if (!selected && profile.qualities.length >= 3) {
      setError("Choose up to three qualities.");
      return;
    }
    update(
      "qualities",
      selected
        ? profile.qualities.filter((item) => item !== quality)
        : [...profile.qualities, quality],
    );
  }

  function validateCurrentStep() {
    if (step === 1) {
      if (!profile.firstName.trim() || !profile.familyName.trim()) {
        setError("Please enter your first name and family name.");
        return false;
      }
      if (!profile.birthDate) {
        setError("Please choose your date of birth.");
        return false;
      }
    }
    if (step === 2 && profile.qualities.length === 0) {
      setError("Choose at least one quality for your name.");
      return false;
    }
    return true;
  }

  function moveTo(nextStep: number) {
    if (nextStep > step && !validateCurrentStep()) return;
    setError("");
    setStep(nextStep);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (step < 3) {
      moveTo(step + 1);
      return;
    }
    if (!validateCurrentStep() || submitting) return;
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please complete the verification before creating your name.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const ticketResponse = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const ticketBody = (await ticketResponse.json()) as ApiError & {
        ticket?: string;
      };
      if (!ticketResponse.ok || !ticketBody.ticket) {
        throw new Error(ticketBody.error ?? "We couldn’t prepare your request.");
      }

      const generationResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          ticket: ticketBody.ticket,
          turnstileToken,
        }),
      });
      const generationBody = (await generationResponse.json()) as ApiError & {
        result?: { id: string };
      };
      if (!generationResponse.ok || !generationBody.result) {
        throw new Error(generationBody.error ?? "We couldn’t create your name.");
      }

      localStorage.setItem(
        `nih:result:${generationBody.result.id}`,
        JSON.stringify(generationBody.result),
      );
      localStorage.setItem("nih:last-result", generationBody.result.id);
      router.push(`/result/${generationBody.result.id}`);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "We couldn’t create your name. Please try again.",
      );
      setTurnstileToken("");
      setChallengeKey((current) => current + 1);
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className="wizard" onSubmit={submit} noValidate>
      <div className="wizard-progress" aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={item <= step ? "progress-segment active" : "progress-segment"}
          />
        ))}
      </div>
      <p className="step-count">Step {step} of 3</p>

      {step === 1 ? (
        <section className="wizard-step" aria-labelledby="about-you-title">
          <div className="wizard-heading">
            <h1 id="about-you-title" tabIndex={-1} ref={headingRef}>
              About you
            </h1>
            <p>
              Begin with the details that can help shape a natural Chinese name.
            </p>
          </div>
          <div className="field-grid two-columns">
            <label className="field">
              <span>First name</span>
              <input
                autoComplete="given-name"
                maxLength={40}
                value={profile.firstName}
                onChange={(event) => update("firstName", event.target.value)}
                placeholder="Oliver"
                required
              />
            </label>
            <label className="field">
              <span>Family name</span>
              <input
                autoComplete="family-name"
                maxLength={40}
                value={profile.familyName}
                onChange={(event) => update("familyName", event.target.value)}
                placeholder="Green"
                required
              />
            </label>
          </div>

          <fieldset className="fieldset">
            <legend>Gender expression</legend>
            <p className="field-help">Used only to guide the style of the name.</p>
            <div className="segmented-options">
              {[
                ["feminine", "Feminine"],
                ["masculine", "Masculine"],
                ["neutral", "Gender-neutral"],
                ["no_preference", "No preference"],
              ].map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    checked={profile.genderExpression === value}
                    onChange={() =>
                      update(
                        "genderExpression",
                        value as NameProfile["genderExpression"],
                      )
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field-grid two-columns">
            <div className="field">
              <span id="birth-date-label">Date of birth</span>
              <BirthDatePicker
                ariaLabelledBy="birth-date-label"
                value={profile.birthDate}
                onChange={(value) => update("birthDate", value)}
              />
              <small>
                Used as seasonal inspiration for the name explanation.
              </small>
            </div>
            <label className="field">
              <span>Time of birth</span>
              <select
                value={profile.birthTimePeriod}
                onChange={(event) =>
                  update(
                    "birthTimePeriod",
                    event.target.value as NameProfile["birthTimePeriod"],
                  )
                }
              >
                <option value="unknown">I don’t know</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="late_night">Late night</option>
              </select>
              <small>Optional. A broad time period is enough.</small>
            </label>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="wizard-step" aria-labelledby="style-title">
          <div className="wizard-heading">
            <h1 id="style-title" tabIndex={-1} ref={headingRef}>
              How should your name feel?
            </h1>
            <p>Choose up to three qualities and one overall style.</p>
          </div>
          <fieldset className="fieldset">
            <legend>Qualities</legend>
            <p className="field-help">
              {profile.qualities.length} of 3 selected
            </p>
            <div className="chip-group">
              {qualities.map((quality) => {
                const selected = profile.qualities.includes(quality);
                return (
                  <button
                    type="button"
                    key={quality}
                    className={selected ? "choice-chip selected" : "choice-chip"}
                    aria-pressed={selected}
                    onClick={() => toggleQuality(quality)}
                  >
                    {selected ? <Check aria-hidden size={16} /> : null}
                    {qualityLabels[quality]}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend>Name style</legend>
            <div className="style-options">
              {namingStyles.map((style) => (
                <label key={style} className="style-option">
                  <input
                    type="radio"
                    name="naming-style"
                    value={style}
                    checked={profile.namingStyle === style}
                    onChange={() => update("namingStyle", style)}
                  />
                  <span className="style-radio" aria-hidden />
                  <span>
                    <strong>{styleCopy[style].label}</strong>
                    <small>{styleCopy[style].description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="wizard-step" aria-labelledby="layers-title">
          <div className="wizard-heading">
            <h1 id="layers-title" tabIndex={-1} ref={headingRef}>
              Add cultural perspectives
            </h1>
            <p>
              Every result includes a poetic interpretation. Add another lens if
              it interests you.
            </p>
          </div>

          <div className="perspective-list">
            <div className="perspective-row always-on">
              <div>
                <strong>Poetic interpretation</strong>
                <p>An original image inspired by your name and birth season.</p>
              </div>
              <span className="included-badge">
                <Check aria-hidden size={15} /> Included
              </span>
            </div>
            <label className="perspective-row">
              <span>
                <strong>Daoist perspective</strong>
                <small>
                  Themes of nature, balance, openness, and effortless action.
                </small>
              </span>
              <input
                type="checkbox"
                checked={profile.daoistPerspective}
                onChange={(event) =>
                  update("daoistPerspective", event.target.checked)
                }
              />
            </label>
            <label className="perspective-row">
              <span>
                <strong>Buddhist perspective</strong>
                <small>
                  Themes of awareness, compassion, clarity, and non-attachment.
                </small>
              </span>
              <input
                type="checkbox"
                checked={profile.buddhistPerspective}
                onChange={(event) =>
                  update("buddhistPerspective", event.target.checked)
                }
              />
            </label>
          </div>

          <div className="privacy-note">
            <strong>Your details stay minimal.</strong>
            <p>
              No account is required. We do not retain your English name or full
              birth date long-term. Your result remains available in this browser
              for 30 days.
            </p>
          </div>

          <Turnstile onToken={handleToken} resetKey={challengeKey} />
        </section>
      ) : null}

      {error ? (
        <div className="form-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="wizard-actions">
        {step > 1 ? (
          <button
            type="button"
            className="button button-secondary"
            onClick={() => moveTo(step - 1)}
            disabled={submitting}
          >
            <ArrowLeft aria-hidden size={18} /> Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className={`button button-primary${step === 3 ? " button-large" : ""}`}
          disabled={submitting}
          onClick={() => {
            if (step < 3) {
              moveTo(step + 1);
              return;
            }
            formRef.current?.requestSubmit();
          }}
        >
          {step === 3 && submitting ? (
            <>
              <LoaderCircle className="spin" aria-hidden size={19} />
              Creating and checking your name…
            </>
          ) : step === 3 ? (
            <>
              Create My Chinese Name <ArrowRight aria-hidden size={18} />
            </>
          ) : (
            <>
              Continue <ArrowRight aria-hidden size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
