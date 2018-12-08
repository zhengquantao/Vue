<template>
  <div>
    <h1>课程详细页面</h1>
    <div>
      <p>{{detail.course.id}}</p>
      <p>{{detail.img}}</p>
      <p>{{detail.level}}</p>
      <p>{{detail.slogon}}</p>
      <p>{{detail.title}}</p>
      <p>{{detail.why}}</p>
      <div>
        <ul v-for="item in detail.chapter">
          <li>{{item.name}}</li>
        </ul>
      </div>

      <div>
        <h3>推荐课程</h3>
        <ul v-for="item in detail.recommends">
          <!-- <li><router-link :to="{name:'detail',params:{id:item.id}}">{{item.title}}</router-link><li> -->
          <li @click="changeDetail(item.id)">{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      detail: {
        course: null,
        img: null,
        level: null,
        slogon: null,
        title: null,
        why: null,
        chapter: [],
        recommends: []
      }
    };
  },
  mounted() {
    var id = this.$route.params.id;
    this.initDetail(id);
  },
  methods: {
    initDetail(nid) {
      var nid = this.$route.params.id;
      var that = this;
      this.$axios
        .request({
          url: that.$store.state.courseDetail+ nid + "/",
          method: "GET"
        })
        .then(function(arg) {
          if (arg.data.code === 1000) {
            that.detail = arg.data.data;
          } else {
            alert(arg.data.error);
          }
        });
    },
    changeDetail(id) {
      this.initDetail(id);
      this.$router.push({ name: "detail", params: { id: id } });
    }
  }
};
</script>

<style scoped>
</style>
