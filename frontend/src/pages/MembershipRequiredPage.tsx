import MembershipRequired from "../components/MembershipRequired";

function MembershipRequiredPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MembershipRequired />
      </div>
    </>
  );
}

export default MembershipRequiredPage;
