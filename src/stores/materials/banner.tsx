export default function Banner({
  background,
}: MaterialItemProps & { background: string }) {
  return (
    <div
      className="h-[180px] -mt-4 -mx-4"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${background})`,
      }}
    ></div>
  );
}
