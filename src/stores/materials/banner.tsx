export default function Banner({
  background,
}: MaterialItemProps & { background: string }) {
  return (
    <div
      className="h-[180px]"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${background})`,
      }}
    ></div>
  );
}
