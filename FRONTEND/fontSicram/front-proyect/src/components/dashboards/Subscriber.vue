<template>
  <div></div>
</template>

<script>
import OT from '@opentok/client';  
import { mapState } from 'vuex';
export default {
  name: 'Subscriber',
  props: {
    stream: {
      type: OT.Stream,
      required: true
    },
    session: {
      type: OT.Session,
      required: true
    },
    opts: {
      type: Object,
      required: false
    },
    altura:{
      type:String
    }
  },
  mounted: function() {
    //var publisherOptions = {width: '50%', height:'65vh', name:this.cita.name + ' '+ this.cita.lastname};
    var publisherOptions = {width: '100%' , height:"83vh"};
    const subscriber = this.session.subscribe(
      this.stream,
      this.$el,
      publisherOptions,
      err => {
        if (err) {
          this.$emit('error', err);
        } else {
          this.$emit('subscriberConnected', subscriber);
        }
      }
    );
    this.$emit('subscriberCreated', subscriber);
  },
  computed: {
    ...mapState(['cita'])
  }
};
</script>
