import { createRouter, createWebHistory } from 'vue-router';
import WangyiYun from '../components/WangyiYun'
// import Home from '../components/主体/HelloWorld.vue';
import Index from '../components/主体/MainBody'
import DiscoverMusic from '../components/主体/发现音乐/DiscoverMusic.vue'
import PersonalityRecommendation from '../components/主体/发现音乐/个性推荐/PersonalityRecommendation.vue'
import SongList from '../components/主体/发现音乐/歌单/SongList.vue'
import PlaylistDetails from '../components/主体/歌单详情/PlaylistDetails.vue'
import SingerModule from '../components/主体/发现音乐/歌手/SingerModule.vue'
import SingerDetails from '../components/主体/歌手详情/SingerDetails.vue'
import AlbumComponent from '../components/主体/歌手详情/专辑/AlbumComponent.vue'
import SingerMusicVideo from '../components/主体/歌手详情/MV/SingerMusicVideo.vue'
import SingerDetailsDescription from '../components/主体/歌手详情/歌手详情描述/SingerDetailsDescription.vue'
import SimilarSinger from '../components/主体/歌手详情/相似歌手/SimilarSinger.vue'
import BoutiquePlaylist from '../components/主体/发现音乐/精品歌单/BoutiquePlaylist.vue'
import LatestMusic from '../components/主体/发现音乐/最新音乐/LatestMusic.vue'
import NewDisc from '../components/主体/发现音乐/最新音乐/新碟上架/NewDisc'
import NewSong from '../components/主体/发现音乐/最新音乐/新歌速递/NewSong'
import LeaderBoard from '../components/主体/发现音乐/排行榜/LeaderBoard'
import VideoComponent from '../components/主体/视频/VideoComponent'
import VideoList from '../components/主体/视频/视频组件/VideoList'
import MvList from '../components/主体/视频/MV组件/MvList'
import AllMv from '../components/主体/全部MV/AllMv'
import MvCharts from '../components/主体/MV排行榜/MvCharts'
import MvDetails from '../components/MV详情/MvDetails'








// 创建路由实例并配置路由信息
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: WangyiYun,
      children: [
        {
          path: '',
          redirect: '/index'
        },
        {
          path: 'index',
          component: Index,
          children: [
            {
              path: '',
              redirect: '/index/discover_music'
            },
            {
              path: 'discover_music',
              component: DiscoverMusic,
              children: [
                {
                  path: '',
                  redirect: '/index/discover_music/personality_recommendation'
                },
                {
                  path: 'personality_recommendation',
                  component: PersonalityRecommendation,
                },
                {
                  path: 'song_list',
                  component: SongList,
                }
                ,
                {
                  path: 'singer_module',
                  component: SingerModule,
                },
                {
                  path: 'boutique_playlist',
                  component: BoutiquePlaylist,
                },
                {
                  path: 'latest_music',
                  component: LatestMusic,
                  children: [
                    {
                      path: '',
                      redirect: '/index/discover_music/latest_music/new_song'
                    },
                    {
                      path: 'new_disc',
                      component: NewDisc
                    },
                    {
                      path: 'new_song',
                      component: NewSong,
                    }
                  ]
                },
                {
                  path: 'leader_board',
                  component: LeaderBoard,
                }
              ]
            },
            {
              path: 'playlist_details',
              component: PlaylistDetails,
            },
            {
              path: 'singer_details',
              component: SingerDetails,
              children: [
                {
                  path: '',
                  redirect: '/index/singer_details/album_component'
                },
                {
                  path: 'album_component',
                  component: AlbumComponent,
                },
                {
                  path: 'singer_music_video',
                  component: SingerMusicVideo,
                },
                {
                  path: 'singer_details_description',
                  component: SingerDetailsDescription,
                },
                {
                  path: 'similar_singer',
                  component: SimilarSinger,
                },
              ]
            },
            {
              path: 'video_component',
              component: VideoComponent,
              children: [
                {
                  path: '',
                  redirect: '/index/video_component/video_list'
                },
                {
                  path: 'video_list',
                  component: VideoList,
                },
                {
                  path: 'mv_list',
                  component: MvList,
                }
              ]
            },
            {
              path: 'all_mv',
              component: AllMv,
            },
            {
              path: 'mv_charts',
              component: MvCharts,
            },
          ]
        },
        {
          path: 'mv_details',
          component: MvDetails,
        }
      ]
    }
    // {
    //   path: '/',
    //   component: Index,
    //  
  ]
});

export default router;