import styles from "./ArticleCard.module.css";

interface ArticleProps {
  title: string;
  tags: string[];
  date: string;
  imageSrc: string;
  description: string;
}

const NewArticle = ({ title, tags, date, imageSrc, description } : ArticleProps) => (
  <div className={styles.card}>
    <img src={imageSrc} alt="Article" className={styles.image} />
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <p className={styles.description}>{description}</p>
      <p className={styles.date}>发布于{date}</p>
    </div>
  </div>
);

export default NewArticle;
