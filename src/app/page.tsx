import HeroSlider from "../components/HeroSlider";
import LatestStories from "../components/LatestStories";
import ProjectsGrid from "../components/ProjectsGrid";
import HighlightsGrid from "../components/HighlightsGrid";

export default function Home() {
  return (
    <>
      {/* Hero Slider from news */}
      <HeroSlider />

      {/* Latest stories from news */}
      <LatestStories />

      {/* Projects from data */}
      <ProjectsGrid />

      {/* Highlights from YouTube */}
      <HighlightsGrid />

      {/* Partners (static for now, uses existing classes) */}
      <section className="partners" id="partners">
        <div className="container">
          <h2>Our Partners</h2>
          <div className="partners-list">
            <div className="partner">
              <img src="/tibet-relief-fund.jpg" alt="Tibet Relief Fund" />
              <div className="partner-info">
                <h3>Tibet Relief Fund</h3>
                <p>
                  Tibet Relief Fund works to empower Tibetans to build
                  sustainable communities and better futures through education
                  and innovative practical grassroots work.
                </p>
              </div>
            </div>
            <div className="partner">
              <img src="/tibet-fund.jpg" alt="The Tibet Fund" />
              <div className="partner-info">
                <h3>The Tibet Fund</h3>
                <p>
                  The Tibet Fund's primary mission is to preserve the distinct
                  cultural and national identity of the Tibetan people. Our aim
                  is to promote self-reliance and help sustain the cohesiveness
                  of the exile Tibetan community.
                </p>
              </div>
            </div>
            <div className="partner">
              <img src="/german-tibet-aid.jpg" alt="The German Tibet Aid" />
              <div className="partner-info">
                <h3>The German Tibet Aid</h3>
                <p>
                  The German Tibet Aid e.V. was founded in 1962 and since then
                  has been taking care of the many thousands of Tibetan refugees
                  who have had to leave their homeland since the Chinese
                  occupation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
