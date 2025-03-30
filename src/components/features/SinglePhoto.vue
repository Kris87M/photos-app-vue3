<template>
  <Dialog
    v-if="singlePhoto"
    :closable="false"
    :visible="true"
    :style="{ width: '25vw'}"
    :modal="true">

    <card style="margin-top: 1.5rem; overflow: hidden" >
    <template #header>
        <div class="photo-container">
          <image-item :src="singlePhoto.src"/>
          <div class="vote-layer">
            <span class="votes">{{ singlePhoto.votes }}</span>
            <Button icon="pi pi-star" text rounded class="text-white"/>
          </div>
      </div>
    </template>
    <template #title>{{ singlePhoto.title }}</template>
    <template #subtitle>{{`by ${singlePhoto.author}`}}</template>
    <template #content>
        <p class="m-0">
            {{ singlePhoto.description }}
        </p>
    </template>
    <template #footer>
        <div class="flex gap-4 mt-1">
            <Button :label="singlePhoto.category" icon="pi pi-bookmark" outlined rounded raised/>
        </div>
    </template>
  </card>

    <template v-slot:footer>
      <Button
        class="p-button-rounded"
        label="Close"
        icon="pi pi-times"
        @click="$router.back()"
        autofocus />
    </template>

  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ImageItem from '../layout/ImageItem.vue'
import { mapActions, mapState } from 'vuex'

// fix version inconsistence
Dialog.methods.removeStylesFromMask = () => {}

export default {
  name: 'SinglePhoto',
  components: { Dialog, Button, Card, ImageItem },
  computed: {
    ...mapState('Photos', ['singlePhoto'])
  },
  methods: {
    ...mapActions('Photos', ['fetchSinglePhoto'])
  },
  created () {
    const photoId = this.$route.params.photoId
    this.fetchSinglePhoto(photoId)
  }
}
</script>

<style lang="scss" scoped>
.p-dialog-mask {
  pointer-events: auto;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
}
.photo-container {
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
</style>
