export function NameCardPreview() {
  return (
    <figure className="name-card-preview">
      <div className="preview-card" role="img" aria-label="Example digital name card: 林知远, Lín Zhīyuǎn, awareness with a far-reaching vision, with a red name seal">
        <div>
          <p className="preview-label">SinoName · A name shaped with care</p>
          <p className="preview-name" lang="zh-Hans">林知远</p>
          <p className="preview-pinyin">Lín Zhīyuǎn</p>
          <p>Awareness with a far-reaching vision.</p>
        </div>
        <span className="preview-seal" aria-hidden="true" lang="zh-Hans">
          <span>知</span><span>林</span><span>印</span><span>遠</span>
        </span>
      </div>
      <figcaption>Illustrative name card and digital seal layout. Your downloaded card uses your generated name.</figcaption>
    </figure>
  );
}
