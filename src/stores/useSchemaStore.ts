import { create } from "zustand";

interface SchemaState {
  schema: FormexSchema;
  setSchema: (schema: FormexSchema) => void;

  overPlacement: "top" | "bottom";
  overComponentId: string;
}

interface SchemaAction {
  insertFormItem: (materialItem: MaterialItem) => void;
  swapFormItem: (dragItemId: string, hoverItemId: string) => void;

  setOverComponentId: (componentId: string) => void;
  setOverComponentPlacement: (placement: "top" | "bottom") => void;
}

export const useSchemaStore = create<SchemaState & SchemaAction>((set, get) => {
  return {
    schema: {
      version: "1.0",
      title: "表单标题",
      subtitle: "表单副标题",
      background:
        "https://winrobot-pub-a-1302949341.cos.ap-shanghai.myqcloud.com/image/20250514202954/395c74ad8b4de6e1b7a38247700842aa.png",
      formItems: [],
      btnText: "提交",
    },
    setSchema: (schema) => set({ schema }),

    overComponentId: "",
    overPlacement: "top",
    setOverComponentId: (componentId) => {
      set((prev) => {
        return {
          ...prev,
          overComponentId: componentId,
        };
      });
    },
    setOverComponentPlacement: (placement) => {
      set((prev) => {
        return {
          ...prev,
          overPlacement: placement,
        };
      });
    },

    swapFormItem: (dragItemId: string, hoverItemId: string) => {
      const { schema, overPlacement } = get();
      const { formItems } = schema;

      const dragIndex = formItems.findIndex((it) => it.id === dragItemId);
      let hoverIndex = formItems.findIndex((it) => it.id === hoverItemId);

      if (dragIndex !== -1 && hoverIndex !== -1) {
        // 拷贝一份
        const dragItemClone = {
          ...formItems[dragIndex],
        };

        formItems.splice(dragIndex, 1);

        // 重新计算 hoverIndex
        hoverIndex = formItems.findIndex((it) => it.id === hoverItemId);
        if (hoverIndex !== -1) {
          const insertIndex =
            overPlacement === "top" ? hoverIndex : hoverIndex + 1;

          formItems.splice(insertIndex, 0, dragItemClone);
        }

        set({ ...get() });
      }
    },

    insertFormItem(materialItem: MaterialItem) {
      const { schema, overComponentId, overPlacement } = get();
      const { formItems } = schema;

      const newItem: FormexItem = {
        code: materialItem.code,
        id: `${materialItem.code}-${Date.now()}`,
        props: {
          ...materialItem.defaultProps,
        },
      };

      const index = formItems.findIndex((it) => it.id === overComponentId);
      if (index !== -1) {
        const insertIndex = overPlacement === "top" ? index : index + 1;
        formItems.splice(insertIndex, 0, newItem);
      } else {
        formItems.push(newItem);
      }

      set({ ...get() });
    },
  };
});
