"use client";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  router.push("/admin");
  return <></>;
};

export default App;
