import { type Slot } from 'vue';
export default function useHasSlot(): {
    hasSlotContent: (slot: Slot | undefined, slotProps?: {}) => boolean;
};
