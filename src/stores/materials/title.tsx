export default function Title(props: MaterialItemProps) {
  return (
    <div className=" line-clamp-1 text-center text-xl font-semibold my-6">
      {props.text}
    </div>
  );
}
