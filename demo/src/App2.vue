<template>

  <chat-container
    ref="chatWindow"
    :height="screenHeight"
    :theme="theme"
    :roomsListOpened=true
    :current-user-id="currentUserId"
    :rooms="JSON.stringify(rooms)"
    :loading-rooms="loadingRooms"
    :rooms-loaded="roomsLoaded"
    :room-id="roomId"
    :load-first-room="true"
    :room-message="roomMessage"
    :single-room="false"
    :messages="messages"
    :messages-loaded="messagesLoaded"
    @send-message="sendMessage"
    @fetch-messages="fetchMessages"
  >
  </chat-container>


</template>

<script>
import ChatContainer from '../../src/lib/ChatWindow'

export default {
  name: 'OneTchat', // there is a `name: 'users'` key-value.
  components: {
    ChatContainer
  },

  data() {
    return {
      roomsLoaded: false,
      roomId: '',
      roomMessage: '',
      loadingRooms: true,
      startRooms: null,
      endRooms: null,
      currentUserId: '1',
      rooms: [
        {
          roomId: '1',
          roomName: 'Meg',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          // lastMessage: {
          //   _id: 'xyz',
          //   content: 'Last message received',
          //   senderId: '2',
          //   username: 'John Doe',
          //   timestamp: '10:20',
          //   saved: true,
          //   distributed: false,
          //   seen: false,
          //   new: true
          // },
          // roomMessage: 'hii',
          users: [
            { _id: '1', username: 'Duchnoun' },
            {
              _id: '2',
              username: 'Meg',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30'
              }
            },
          ],
          typingUsers: [2]
        },
        {
          roomId: '2',
          roomName: 'Clem',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            { _id: '1', username: 'Duchnoun' },
            { _id: '3', username: 'Clem' },
          ]
        },
        {
          roomId: '3',
          roomName: 'Salon grenoble',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            { _id: '1', username: 'Duchnoun' },
            { _id: '2', username: 'Meg' },
            { _id: '3', username: 'Clem' },
          ]
        },
      ],
      messages: [],
      messagesLoaded: false
    }
  },

  computed: {
    loadedRooms() {
      return this.rooms.slice(0, this.roomsLoadedCount)
    },
    screenHeight() {
      return this.isDevice ? window.innerHeight + 'px' : 'calc(100vh - 80px)'
    }
  },

  mounted() {
    // this.addCss()
    // this.fetchRooms()
    // firebaseService.updateUserOnlineStatus(this.currentUserId)
  },

  methods: {

    async addCss() {
      if (import.meta.env.MODE === 'development') {
        const styles = await import('./../../src/styles/index.scss')
        const style = document.createElement('style')
        style.innerHTML = styles.default
        // this.$refs.chatWindow.shadowRoot.appendChild(style)
      }
    },

    resetRooms() {
      this.loadingRooms = true
      this.loadingMessages = true
      // this.loadingLastMessageByRoom = 0
      this.roomsLoadedCount = 0
      // this.rooms = []
      this.roomsLoaded = false
      this.startRooms = null
      this.endRooms = null
      // this.roomsListeners.forEach(listener => listener())
      this.roomsListeners = []
      // this.resetMessages()
      this.messagesLoaded = false
    },

    fetchMessages({ room, options = {} }) {
      // this.lastRoomFetch = room ;
      // this.resetRooms()
      // IT WORK LIKE THAT !

      this.messagesLoaded = false
      this.loadingMessages = true
      this.roomsLoaded = true
      this.loadingRooms = false

      console.log('fetch!')
      if (options.reset) {
        this.messages = this.addMessages(options.reset, room)
      } else {
        this.messages = [...this.addMessages(options.reset, room), ...this.messages]
      }

      // use timeout to mimic server fetched data
      setTimeout(() => {
        this.messagesLoaded = true
        //  this.roomsLoaded = true
        // this.loadingRooms = false
        this.loadingMessages = false

      }, 0)

    },

    addMessages(reset, room) {
      const messages = []

      for (let i = 0; i < 30; i++) {
        messages.push({
          _id: reset ? i : this.messages.length + i,
          content: `${reset ? '' : 'paginated'} message ${i + 1}`,
          senderId: room.users[1]._id,
          username: room.users[1].username,
          date: '13 November',
          timestamp: '10:20'
        })
      }

      return messages
    },

    sendMessage(message) {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length,
          content: message.content,
          senderId: this.currentUserId,
          timestamp: new Date().toString().substring(16, 21),
          date: new Date().toDateString()
        }
      ]
    },

    addNewMessage() {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: this.messages.length,
            content: 'NEW MESSAGE',
            senderId: '1',
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ]
      }, 2000)
    }
  }
}

</script>

<style lang="scss">

</style>
