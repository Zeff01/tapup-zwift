export const RememberButton = () => {
  return (
    <div className="py-[12px] pb-[20px] flex justify-between items-center ">
      <div className="flex gap-x-2">
        <input type="checkbox" />
        <span>Remember password</span>
      </div>
      <p className="text-[#21C15C] ">Forgot your password?</p>
    </div>
  );
};
