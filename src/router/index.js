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
import AlbumDetails from '../components/主体/专辑详情/AlbumDetails'
import AlbumSongList from '../components/主体/专辑详情/歌曲列表/AlbumSongList'
import AlbumIntroduction from '../components/主体/专辑详情/专辑简介/AlbumIntroduction'
import AlbumDetailsComponent from '../components/主体/专辑详情/评论/AlbumDetailsComponent'
import PlaylistSongList from '../components/主体/歌单详情/歌曲列表/PlaylistSongList'
import PlaylistReview from '../components/主体/歌单详情/歌单评论/PlaylistReview'
import PlaylistCollection from '../components/主体/歌单详情/收藏者/PlaylistCollection'
import ExclusiveMV from '../components/主体/独家放送/ExclusiveMV'
import SearchList from '../components/主体/搜索列表/SearchList'
import SearchSingle from '../components/主体/搜索列表/单曲/SearchSingle'
import SearchPodcast from '../components/主体/搜索列表/播客/SearchPodcast'
import SearchLyric from '../components/主体/搜索列表/歌词/SearchLyric'
import SearchSongList from '../components/主体/搜索列表/歌单/SearchSongList'
import SearchSinger from '../components/主体/搜索列表/歌手/SearchSinger'
import SearchAudio from '../components/主体/搜索列表/声音/SearchAudio'
import SearchVideo from '../components/主体/搜索列表/视频/SearchVideo'
import SearchUser from '../components/主体/搜索列表/用户/SearchUser'
import SearchAlbum from '../components/主体/搜索列表/专辑/SearchAlbum'
import UsersLikeMusic from '../components/主体/我喜欢的音乐/UsersLikeMusic'
import UsersLoveSongCollections from '../components/主体/我喜欢的音乐/收藏者/UsersLoveSongCollections'
import UsersLoveSongLists from '../components/主体/我喜欢的音乐/歌曲列表/UsersLoveSongLists'
import UsersLoveSongReviews from '../components/主体/我喜欢的音乐/歌单评论/UsersLoveSongReviews'
import RecentlyPlayed from '../components/主体/最近播放/RecentlyPlayed'
import PrivateRoaming from '../components/主体/私人漫游/PrivateRoaming'





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
              children: [
                {
                  path: 'playlist_song_list',
                  component: PlaylistSongList
                },
                {
                  path: 'playlist_review',
                  component: PlaylistReview
                },
                {
                  path: 'playlist_collection',
                  component: PlaylistCollection
                }
              ]
            },
            {
              path: 'album_details',
              component: AlbumDetails,
              children: [
                {
                  path: 'album_song_list',
                  component: AlbumSongList
                },
                {
                  path: 'album_details_component',
                  component: AlbumDetailsComponent
                },
                {
                  path: 'album_introduction',
                  component: AlbumIntroduction
                }
              ]
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
            {
              path: 'exclusive_MV',
              component: ExclusiveMV,
            },
            {
              path: 'search_list',
              component: SearchList,
              children: [
                {
                  path: 'search_single',
                  component: SearchSingle,
                },
                {
                  path: 'search_podcast',
                  component: SearchPodcast,
                },
                {
                  path: 'search_lyric',
                  component: SearchLyric,
                },
                {
                  path: 'search_songList',
                  component: SearchSongList,
                },
                {
                  path: 'search_singer',
                  component: SearchSinger,
                },
                {
                  path: 'search_audio',
                  component: SearchAudio,
                },
                {
                  path: 'search_video',
                  component: SearchVideo,
                },
                {
                  path: 'search_user',
                  component: SearchUser,
                },
                {
                  path: 'search-album',
                  component: SearchAlbum,
                },
              ]
            },
            {
              path: 'users-like-music',
              component: UsersLikeMusic,
              children: [
                {
                  path: 'users-love-song-lists',
                  component: UsersLoveSongLists
                },
                {
                  path: 'users-love-song-reviews',
                  component: UsersLoveSongReviews
                },
                {
                  path: 'users-love-song-collections',
                  component: UsersLoveSongCollections
                }
              ]
            },
            {
              path:'recently-played',
              component:RecentlyPlayed,
            },
            {
              path:'private-roaming',
              component:PrivateRoaming
            }
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