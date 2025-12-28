import Circle from "./Circle";

export default function SignupCounter({ stepNo }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap: "15%",
      }}
    >
      <Circle CurrentStep={stepNo} StepNo={1} Subtitle={"Verify Email"} />
      <Circle CurrentStep={stepNo} StepNo={2} Subtitle={"Create Password"} />
      <Circle CurrentStep={stepNo} StepNo={3} Subtitle={"Done"} />
    </div>
  );
}
