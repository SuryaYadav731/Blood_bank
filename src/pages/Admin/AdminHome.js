import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin  <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
          At the heart of every thriving community is the commitment to health and well-being. The LifeFlow admin dashboard stands as the digital command center, empowering you to orchestrate the life-saving mission of blood donation with precision and compassion.

<h5>Our Mission:</h5> Saving Lives, One Donation at a Time

In the intricate tapestry of healthcare, access to a reliable and ample blood supply is a cornerstone. This dashboard is your gateway to managing the intricate dance of donors, recipients, and the precious life-giving fluid that connects them.

Real-Time Insights, Real-Life Impact

Navigate effortlessly through the vital signs of our blood bank. From inventory management that ensures no blood type is left unattended to, to the coordination of donations and distributions, this dashboard is your compass for real-time insights and informed decision-making.

Empowering Donors, Supporting Recipients

Behind each data point lies a story—a story of generosity, selflessness, and hope. Discover and manage the profiles of donors who have chosen to make a difference, and recipients whose lives depend on your efficient coordination.

Security and Compliance: Our Top Priority

As stewards of sensitive health data, we uphold the highest standards of security and compliance. Every interaction you have within this dashboard is not just a data point; it's a commitment to the trust bestowed upon us by donors, recipients, and the healthcare community.

Together, We Make a Difference

This dashboard is more than a tool; it's a symbol of our collective commitment to saving lives. By leveraging technology, data, and human compassion, we stand united in the fight against blood-related challenges.

Thank you for being an integral part of the LifeFlow community. Your dedication ensures that the gift of life continues to flow through the veins of those in need.


          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;