// function Landing() {
//   return <h1>Landing Page</h1>;
// }

// export default Landing;
import PrimaryButton from "../../components/common/PrimaryButton";

function Landing() {
  return (
    <div
      style={{
        backgroundColor: "#14004D",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PrimaryButton text="LOGIN" />
    </div>
  );
}

export default Landing;