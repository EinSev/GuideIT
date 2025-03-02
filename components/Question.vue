<script setup lang="ts">
import {VueDraggable} from "vue-draggable-plus";
import {ref, onMounted} from "vue";

const props = defineProps<{
  question: Question;
}>();

defineEmits(["next", "back"]);

function shuffleArray(array: Answer[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const list = ref<Answer[]>([]);

onMounted(() => {
  //list.value = shuffleArray(props.answers);
  list.value = props.question.answers;
})

watch(() => props.question, () => {
  list.value = props.question.answers;
})

const headingClass = computed(() => {
  const length = props.question.question.length;
  if (length < 20) return "text-6xl";
  if (length < 50) return "text-5xl";
  return "text-4xl";
});

</script>

<template>
  <div class="flex flex-col justify-center items-center ">
    <div class="h-16">
      <h1 class="text-center font-semibold" :class="headingClass">{{ question.question }}</h1>
    </div>
    <VueDraggable v-model="list" class="border-2 w-1/2 rounded-xl mt-5 font-normal" target=".sort-target">
      <transition-group type="transition" tag="ul" name="fade" class="sort-target divide-y-2">
        <li v-for="item in list" :key="item.id"
          class="flex flex-row items-center justify-between gap-x-5 text-lg py-2 px-3 cursor-grab h-20">
          <span>{{ item.answer }}</span>
          <div class="flex items-center">
            <Icon name="material-symbols:drag-indicator" size="32" />
          </div>
        </li>
      </transition-group>
    </VueDraggable>
    <div class="flex justify-between w-1/2 mt-2">
      <button @click="$emit('back', list)"
        class="bg-guideit-50 text-guideit-800 border-2 border-guideit-400 rounded-lg pl-1 pt-0.5 pr-2 mt-5 flex gap-x-2 items-center">
        <Icon name="material-symbols:arrow-back" size="20" />
        <span>Zurück</span>
      </button>
      <button @click="$emit('next', list)"
        class="bg-guideit-50 text-guideit-800 border-2 border-guideit-400 rounded-lg pr-1 pt-0.5 pl-2 mt-5 flex gap-x-2 items-center">
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
