import { Form, Typography } from "antd";

export default function PreviewFormex({ schema }: { schema: FormexSchemaV1 }) {
  const { title, subtitle, background } = schema;
  return (
    <div className="w-full h-full bg-white md:bg-gradient-to-b md:from-indigo-200 md:via-cyan-50 md:to-white ">
      <div
        className="h-[180px]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${background})`,
        }}
      ></div>

      <div className="mt-4 p-4">
        <div className=" line-clamp-1 text-center text-xl font-semibold">
          {title}
        </div>
        <Typography.Text type="secondary" className="">
          {subtitle}
        </Typography.Text>
        <Form></Form>
      </div>
    </div>
  );
}
