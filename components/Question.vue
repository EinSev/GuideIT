<script setup lang="ts">
import {VueDraggable} from "vue-draggable-plus";

const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits(["next", "back"]);

const list = ref<Answer[]>([]);

onMounted(() => {
  list.value = props.question.answers;
})

watch(() => props.question, () => {
  list.value = props.question.answers;
})

const headingClass = computed(() => {
  const length = props.question.question.length;
  if (length < 20) return "text-3xl lg:text-6xl";
  if (length < 50) return "text-2xl lg:text-5xl";
  return "text-xl lg:text-4xl";
});

</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="h-16 lg:h-20">
      <h1 class="text-center font-semibold" :class="headingClass">{{ question.question }}</h1>
    </div>
    <div class="lg:w-1/2 flex mt-5">
      <div
        class="flex flex-col bg-guideit-100 px-5 text-2xl font-medium border-l-2 border-y-2 rounded-l-xl border-black-default">
        <div v-for="(answer, index) in question.answers" class="py-2 h-[4.25rem] flex items-center">{{ index + 1 }}
        </div>
      </div>
      <VueDraggable v-model="list" class="border-2 rounded-r-xl font-normal border-black-default w-full"
        target=".sort-target">
        <transition-group type="transition" tag="ul" name="fade" class="sort-target divide-y-2">
          <li v-for="item in list" :key="item.id"
            class="flex flex-row items-center justify-between gap-x-5 text-sm lg:text-lg py-2 px-3 cursor-grab h-[4.25rem] select-none">
            <span>{{ item.answer }}</span>
            <div class="flex items-center">
              <Icon name="material-symbols:drag-indicator" size="25" />
            </div>
          </li>
        </transition-group>
      </VueDraggable>
    </div>
    <div class="flex justify-between w-full lg:w-1/2 mt-2 lg:mt-8">
      <button @click="$emit('back', list)"
        class="bg-guideit-50 hover:bg-guideit-200 text-guideit-800 border-2 border-guideit-400 rounded-lg pl-1 pr-2 py-1 lg:py-1.5 flex gap-x-2 items-center select-none">
        <Icon name="material-symbols:arrow-back" size="20" />
        <span>Zurück</span>
      </button>
      <button @click="$emit('next', list)"
        class="text-guideit-100 border-2 border-guideit-100 bg-guideit-800 hover:bg-guideit-950 rounded-lg pr-1 pl-2 py-1 lg:py-1.5 flex gap-x-2 items-center select-none">
        <span>Weiter</span>
        <Icon name="material-symbols:arrow-forward" size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

</style>
