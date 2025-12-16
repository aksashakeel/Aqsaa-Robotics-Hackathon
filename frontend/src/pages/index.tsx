import type {ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--6')}>
            <Heading as="h1" className={styles.heroTitle}>
              Physical AI & <br />
              <span>Humanoid Robotics</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              Master the future of AI-powered robotics with hands-on learning.
              Dive into ROS 2, Gazebo, and VLA architectures.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.signInBtn}
                to="/signup">
                Sign in to Read
              </Link>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Start Course
              </Link>
            </div>
          </div>
          <div className={clsx('col col--6')}>
            <div className={styles.robotContainer}>
              <div className={styles.hologramCircle}></div>
              <div className={styles.robotPlaceholder}>
                🤖
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function BookChapters() {
  return (
    <div className="container padding-vert--xl">
      <div className="row">
        <div className="col col--12">
          <Heading as="h2" className="text--center margin-bottom--xl" style={{fontSize: '2.5rem'}}>
            <span style={{borderBottom: '3px solid #f72585', paddingBottom: '10px'}}>Course Modules</span>
          </Heading>
        </div>
      </div>
      <div className="row">
        {[
          {
            title: 'Module 1: Foundations',
            desc: 'The convergence of AI and Robotics, VLA models, and Humanoid anatomy.',
            link: '/docs/module1'
          },
          {
            title: 'Module 2: ROS 2 Core',
            desc: 'The nervous system of robots: Nodes, Topics, Services, and DDS.',
            link: '/docs/module2'
          },
          {
            title: 'Module 3: Simulation',
            desc: 'Digital Twins, URDF modeling, and the Sim-to-Real transfer gap.',
            link: '/docs/module3'
          },
          {
            title: 'Module 4: Visual Navigation',
            desc: 'Advanced SLAM, perception, and path planning (Coming Soon).',
            link: '#'
          }
        ].map((item, idx) => (
          <div className="col col--3" key={idx}>
            <div className="card margin-bottom--lg" style={{height: '100%'}}>
              <div className="card__header">
                <h3>{item.title}</h3>
              </div>
              <div className="card__body">
                <p>{item.desc}</p>
              </div>
              <div className="card__footer">
                <Link className={`button button--primary button--block ${item.link === '#' ? 'disabled' : ''}`} to={item.link}>
                  {item.link === '#' ? 'Coming Soon' : 'Start Module'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A comprehensive textbook on Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <BookChapters />
      </main>
    </Layout>
  );
}