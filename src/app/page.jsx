"use client";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  return <button onClick={() => router.push("/login")}>LOGIN PAGE</button>;
};

export default App;
