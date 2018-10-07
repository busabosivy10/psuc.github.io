<template>
  <div>



    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1000"
                img-height="250"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="/psu1.png" alt="psu" />
      </b-carousel-slide>
       <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="/psu.png" alt="psu" />
      </b-carousel-slide>
       <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="/psu4.png" alt="psu" />
      </b-carousel-slide>

    </b-carousel>
    <b-card  bg-variant="dark" text-variant="white" title="Vision and Mission">
    <b-card  bg-variant="dark" text-variant="white" title="Vision">
    </b-card>
  <p class="card-text">
    The Pangasinan State University, through instruction, research, extension and production, commits to develop highly principled, morally upright, innovative and globally competent individuals capable of meeting the needs of industry, public service and civil society.
  </p>
  </b-card>
  <b-card  bg-variant="dark" text-variant="white" title="">
    <b-card  bg-variant="dark" text-variant="white" title="Vision and Mission">
    </b-card>
  <p class="card-text">
    To become an ASEAN Premier State University in 2020
  </p>
</b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
<!-- carousel-1.vue -->