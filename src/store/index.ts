import { reactive } from "vue";
import { localStorage } from "@/plugins/storage";

export const store: any = reactive({
  mat: localStorage.get('material'),
  setMat: (material: string) => {
    store.mat = material;
    localStorage.set('material', material);
  },
  materials: undefined,
  proofs: undefined,
});