export const RememberButton = () => {
  return (
    <div className="pt-2 flex justify-between items-center ">
      <div className="flex gap-x-2">
        <input type="checkbox" />
        <span className="font-mono text-sm">Remember password</span>
      </div>
      <p className="text-[#21C15C] text-sm">Forgot your password?</p>
    </div>
  );
};