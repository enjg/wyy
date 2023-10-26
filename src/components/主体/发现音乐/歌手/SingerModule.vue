<template>
  <div class="zt">
    <div class="select">
      <form action="">
        <tbody>
          <tr>
            <td><p>语种：</p></td>
            <td>
              <label
                v-for="(item, key) in SingerFilterArray.language"
                :key="key"
                class="highlight-label"
                ><input
                  type="radio"
                  id="apple"
                  name="language"
                  :value="item.key"
                  class="hidden-radio"
                  v-model="FilterArray.language"
                />
                <p>{{ item.name }}</p>
              </label>
            </td>
          </tr>
          <tr>
            <td><p>分类：</p></td>
            <td>
              <label
                v-for="(item, key) in SingerFilterArray.sort"
                :key="key"
                class="highlight-label"
                ><input
                  type="radio"
                  id="apple"
                  name="sort"
                  :value="item.key"
                  class="hidden-radio"
                  v-model="FilterArray.sort"
                />
                <p>{{ item.name }}</p>
              </label>
            </td>
          </tr>
          <tr>
            <td><p>筛选：</p></td>
            <td>
              <label
                v-for="(item, key) in SingerFilterArray.screen"
                :key="key"
                class="highlight-label"
                ><input
                  type="radio"
                  id="apple"
                  name="screen"
                  :value="item"
                  class="hidden-radio"
                  v-model="FilterArray.screen"
                />
                <p>{{ item }}</p>
              </label>
            </td>
          </tr>
        </tbody>
      </form>
    </div>
    <list-of-singers :message="FilterArray"></list-of-singers>
  </div>
</template>

<script setup>
import { reactive} from "vue";
import ListOfSingers from "./歌手列表/ListOfSingers.vue";

let SingerFilterArray = reactive({
  language: [
    { name: "全部", key: -1 },
    { name: "华语", key: 7 },
    { name: "欧美", key: 96 },
    { name: "日本", key: 8 },
    { name: "韩国", key: 16 },
    { name: "其他", key: 0 },
  ],
  sort: [
    { name: "全部", key: -1 },
    { name: "男歌手", key: 1 },
    { name: "女歌手", key: 2 },
    { name: "乐队组合", key: 3 },
  ],
  screen: [
    "热门",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "#",
  ],
});
let FilterArray = reactive({
  language: -1,
  sort: -1,
  screen: "热门",
});

</script>

<style scoped>
.zt {
  width: 1070px;
}
tr > td:nth-child(1) {
  width: 50px;
  vertical-align: top;
}
td:nth-child(2) {
  width: 1020;
}
tr{
  margin: 0;
}
td{
  padding: 0;
}
tr > td:nth-child(1) > p {
  line-height: 40px;
  margin: 0;
  font-size: 13px;
}
tr > td:nth-child(2) p {
  padding: 0 20px;
  line-height: 25px;
  margin: 0;
  /* margin: 7.5px 5px 0 5px; */
  font-size: 12px;
  text-align: center;
  
}
.hidden-radio {
  display: none;
}

.highlight-label {
  cursor: pointer;
  padding: 5px;
  float: left;
}

.highlight-label input[type="radio"]:checked + p {
  background-color: rgb(255, 226, 226);
  border-radius: 15px;
  color: red;
}
</style>