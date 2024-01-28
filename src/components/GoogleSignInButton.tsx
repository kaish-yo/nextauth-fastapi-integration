import { Button } from "./ui/button";

type GoogleSignInButtonProps = {
  children: React.ReactNode;
};

export default function GoogleSignInButton({ children }: GoogleSignInButtonProps) {
  const loginWithGoogle = () => {
    console.log("login with google");
  };

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
}
