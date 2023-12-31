import LandingPageLayout from '../_components/LandingPageLayout/LandingPageLayout';
import styles from './layout.module.scss';
import gymStats from '../../public/images/fitness-stats.png';
import Image from 'next/image';

type LandingPageProps = {
  children: any;
};

export default function LandingPage({ children }: LandingPageProps) {
  return (
    <LandingPageLayout>
      <div>
        <div className={styles.title}>
          <p>
            <i>Fit</i>
            <b>TRACK</b>
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={gymStats}
            alt="man running illustration"
          />
        </div>
      </div>
      {children}
    </LandingPageLayout>
  );
}
