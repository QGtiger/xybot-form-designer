import { useMaterialMap } from "@/stores/useMaterialStore";
import { Form, Typography } from "antd";
import classNames from "classnames";

export default function PreviewFormex({ schema }: { schema: FormexSchema }) {
  const materialMap = useMaterialMap();
  const { title, subtitle, background, formItems } = schema;

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
        <div className="mt-2">
          <Typography.Text type="secondary">{subtitle}</Typography.Text>
        </div>
        <div className={classNames("mt-4", {})}>
          <Form colon={false} layout="vertical">
            {formItems.map((it) => {
              const { code, props, id } = it;
              const martialItem = materialMap[code];
              if (!martialItem) return;
              const { dev: T } = martialItem;
              return (
                <Form.Item key={id} name={id}>
                  <T id={id} {...martialItem.defaultProps} {...props} />
                </Form.Item>
              );
            })}
          </Form>
        </div>
      </div>
    </div>
  );
}
