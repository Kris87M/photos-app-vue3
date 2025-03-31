<template>
  <card style="margin-top: 1.5rem; overflow: hidden" >
    <template #header>
        <div class="photo-summary-container">
          <image-item :src="src"/>
          <div class="vote-layer">
            <span class="votes">{{ votes }}</span>
            <Button icon="pi pi-star" text rounded class="text-white" />
          </div>
          <div class="photo-layer">
            <Button icon="pi pi-star" text rounded class="star-icon text-white" @click="onVoteClick"/>
          </div>
      </div>
    </template>
    <template #title>
      <router-link :to="getPhotoLink" class="no-underline text-color hover:text-blue-700">
        {{ title }}
      </router-link>
    </template>
    <template #subtitle>{{`by ${author}`}}</template>
    <template #footer>
        <div class="flex gap-4 mt-1">
            <Button :label="category" icon="pi pi-bookmark" outlined rounded raised/>
        </div>
    </template>
  </card>

</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ImageItem from '../layout/ImageItem.vue'

const props = defineProps({
  title: String,
  author: String,
  description: String,
  src: String,
  votes: Number,
  category: { type: String, default: null },
  id: String
})

const emit = defineEmits(['vote'])

const onVoteClick = () => {
  emit('vote', props.id)
}

const getPhotoLink = computed(() =>
  props.category ? `/photos/${props.category}/${props.id}` : `/${props.id}`
)
</script>

<style scoped>
.photo-summary-container {
  position: relative;
}

.vote-layer {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  color: white;
  transform: scale(1.5);
}

.photo-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(155, 89, 182, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.star-icon {
  opacity: 0;
  color: white;
  transition: opacity 0.3s ease-in-out;
  transform: scale(3);
}

.photo-summary-container:hover .photo-layer {
  opacity: 1;
}

.photo-summary-container:hover .star-icon {
  opacity: 1;
}
</style>
