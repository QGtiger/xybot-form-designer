import { create } from "zustand";

interface SchemaState {
  schema: FormexSchema;
  setSchema: (schema: FormexSchema) => void;

  overPlacement: "top" | "bottom";
  overComponentId: string;

  selectedComponentId: string;
}

interface SchemaAction {
  insertFormItem: (materialItem: MaterialItem) => void;
  swapFormItem: (dragItemId: string, hoverItemId: string) => void;

  setOverComponentId: (componentId: string) => void;
  setOverComponentPlacement: (placement: "top" | "bottom") => void;

  setSelectedComponentId: (componentId: string) => void;

  getMaterialItemByComponentId: (
    componentId: string,
    materialMap: Record<string, MaterialItem>
  ) => MaterialItem | undefined;
  getFormexItemByComponentId: (componentId: string) => FormexItem | undefined;
}

export const useSchemaStore = create<SchemaState & SchemaAction>((set, get) => {
  const setSelectedComponentId: SchemaAction["setSelectedComponentId"] = (
    componentId
  ) => {
    set((prev) => {
      return {
        ...prev,
        selectedComponentId: componentId,
      };
    });
  };

  return {
    schema: {
      version: "1.0",
      formItems: [
        {
          id: "banner",
          code: "banner",
        },
        {
          id: "title",
          code: "title",
        },
        {
          id: "subtitle",
          code: "subtitle",
        },
        {
          id: "input-1",
          code: "input",
          props: {
            name: "111",
          },
        },
        {
          id: "submit",
          code: "submit",
        },
      ],
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

        setSelectedComponentId(dragItemClone.id);

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
        // TODO 这里特殊处理一下，添加到倒数第二个
        formItems.splice(formItems.length - 1, 0, newItem);
      }

      setSelectedComponentId(newItem.id);

      set({ ...get() });
    },

    selectedComponentId: "",
    setSelectedComponentId,
    getMaterialItemByComponentId: (componentId, materialMap) => {
      const { schema } = get();
      const { formItems } = schema;
      const item = formItems.find((it) => it.id === componentId);
      if (!item) return;

      const materialItem = materialMap[item.code];
      if (!materialItem) return;

      return materialItem;
    },
    getFormexItemByComponentId(componentId) {
      const { schema } = get();
      const { formItems } = schema;
      return formItems.find((it) => it.id === componentId);
    },
  };
});
