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
  <b-card  bg-variant="dark" text-variant="white" title="PSU Hymn">
  <p class="card-text">
   <p class="card-text">
<ul>Pangasinan State University</ul>
<ul>We proclaim your prestigious name</ul>
<ul>Your banner we will hold up high</ul>
<ul>to guide us evermore</ul>
<ul>Oh! Hail beloved Alma Mater</ul>
<ul>You fulfil a noble mission</ul>
<ul>In instruction, research, extension and production</ul>
<ul>to serve mankind with priden</ul>
<ul>Pangasinan State University</ul>
<ul>Your fame ensures true knowledge</ul>
<ul>Dear PSU, we love you</ul>
<ul>Our PSU, we hail</ul>
<ul>Pangasinan State University</ul>
<ul>Your fame ensures true knowledge</ul>
<ul>Dear PSU, we love you,</ul>
<ul>We pledge our love, PSU, we hail!</ul>
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