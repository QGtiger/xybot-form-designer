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

  updateFormexItemByComponentId: (componentId: string, values: any) => void;

  getFormexItemIndexByComponentId: (componentId: string) => number;

  deleteFormexItemByComponentId: (componentId: string) => void;
}

export const useSchemaStore = create<SchemaState & SchemaAction>((set, get) => {
  const getFormexItemsWithForm = () => {
    const { schema } = get();
    const { formItems } = schema;

    return formItems.find((it) => it.id === "form")?.children || [];
  };

  const getFormexItemById = (
    id: string,
    formexItems: FormexItem[]
  ): FormexItem | undefined => {
    if (!id) return;

    for (const item of formexItems) {
      if (item.id == id) return item;
      if (item.children && item.children.length > 0) {
        const result = getFormexItemById(id, item.children);
        if (result !== null) return result;
      }
    }
    return;
  };

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

  const getFormexItemByComponentId: SchemaAction["getFormexItemByComponentId"] =
    (componentId) => {
      return getFormexItemById(componentId, get().schema.formItems);
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
          id: "form",
          code: "form",
          children: [
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
                name: "表单项标题",
              },
            },
            {
              id: "submit",
              code: "submit",
            },
          ],
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
      const { overPlacement } = get();
      const formItems = getFormexItemsWithForm();

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
      const { overComponentId, overPlacement } = get();
      const formItems = getFormexItemsWithForm();

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
      const item = getFormexItemByComponentId(componentId);
      if (!item) return;

      const materialItem = materialMap[item.code];
      if (!materialItem) return;

      return materialItem;
    },
    getFormexItemByComponentId,

    updateFormexItemByComponentId(componentId, values) {
      const formexItem = getFormexItemByComponentId(componentId);
      if (!formexItem) return;
      formexItem.props = formexItem.props || {};
      Object.assign(formexItem.props, values);
      set({ ...get() });
    },

    getFormexItemIndexByComponentId(componentId) {
      const formexItems = getFormexItemsWithForm();
      return formexItems.findIndex((it) => it.id === componentId);
    },

    deleteFormexItemByComponentId(componentId) {
      const formexItems = getFormexItemsWithForm();
      const index = formexItems.findIndex((it) => it.id === componentId);
      if (index !== -1) {
        formexItems.splice(index, 1);
        set({ ...get() });
      }
    },
  };
});
