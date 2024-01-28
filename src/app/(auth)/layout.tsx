type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="bg-slate-200 p-10 rounded-md">{children}</div>;
}
