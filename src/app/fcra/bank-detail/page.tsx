export const metadata = {
  title: "FCRA Bank Detail - Tibetan National Sports Association",
};

export default function FcraBankDetailPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>FCRA Bank Detail</h1>
          <p>
            Designated FCRA bank account for foreign contributions to Tibetan
            National Sports Association.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: "20px 0 60px" }}>
          <div className="about-section">
            <h2>FCRA Designated Bank Account</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td>
                      <strong>A/C Holder Name</strong>
                    </td>
                    <td>TIBETAN NATIONAL SPORTS ASSOCIATION</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>A/C Number</strong>
                    </td>
                    <td>40068722293</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Beneficiary Bank</strong>
                    </td>
                    <td>State Bank of India</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Beneficiary Branch</strong>
                    </td>
                    <td>New Delhi, main branch</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Swift Code</strong>
                    </td>
                    <td>SBININBB104</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>IFSC Code</strong>
                    </td>
                    <td>SBIN0000691</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="about-section">
            <p style={{ marginBottom: 20 }}>
              All foreign contributions must be routed through the designated
              FCRA bank account above, in accordance with the Foreign
              Contribution (Regulation) Act.
            </p>
            <a href="/contact" className="fcra-contact-btn">
              CONTACT FOR FURTHER INFORMATION
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
