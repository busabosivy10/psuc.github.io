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
  <p class="card-text">
<ul>SG 1: Excellent Student Learning and Career Development</ul>
<ul>SG 2: Strong Research Culture and Technology Transfer</ul>
<ul>SG 3: Good Governance</ul>
<ul>SG 4: Sustainable Social Responsiveness</ul>
<ul>SG 5: Responsive to Globalization and Diversity</ul>
<ul>SG 6: Customer Focus</ul>
  </p>
  </b-card>
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