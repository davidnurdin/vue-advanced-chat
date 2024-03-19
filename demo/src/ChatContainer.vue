<template>
	<div class="window-container" :class="{ 'window-mobile': isDevice }">
        <vue-advanced-chat
          ref="chatWindow"
          :height="screenHeight"
          :theme="theme"
          :current-user-id="currentUserId"
          :rooms="JSON.stringify(rooms)"
          :rooms-loaded="true"
          :loading-room="true"
          :load-first-room="true"
          :single-room="false"
          :messages="JSON.stringify(messages)"
          :messages-loaded="messagesLoaded"
          @send-message="sendMessage($event.detail[0])"
          @fetch-messages="fetchMessages($event.detail[0],$event.detail[1])"
        />
  </div>
</template>

<script>
import { parseTimestamp, formatTimestamp } from '@/utils/dates'
import logoAvatar from '@/assets/logo.png'

// import { register } from 'vue-advanced-chat'
// import { register } from './../../dist/vue-advanced-chat.es.js'
import { register } from './../../src/lib/index.js'

export default {
  data() {
    return {
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
            {_id: '1', username: 'Duchnoun'},
            {
              _id: '2',
              username: 'Meg',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30'
              }
            },
          ],
          typingUsers: [ 2 ]
        },
        {
          roomId: '2',
          roomName: 'Clem',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            {_id: '1', username: 'Duchnoun'},
            {_id: '3', username: 'Clem'},
          ]
        },
        {
          roomId: '3',
          roomName: 'Salon grenoble',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            {_id: '1', username: 'Duchnoun'},
            {_id: '2', username: 'Meg'},
            {_id: '3', username: 'Clem'},
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
    this.addCss()
    // this.fetchRooms()
    // firebaseService.updateUserOnlineStatus(this.currentUserId)
  },

  methods: {
    async addCss() {
      if (import.meta.env.MODE === 'development') {
        const styles = await import('./../../src/styles/index.scss')
        const style = document.createElement('style')
        style.innerHTML = styles.default
        this.$refs.chatWindow.shadowRoot.appendChild(style)
      }
    },

    fetchMessages({ room, options = {}}) {
      // this.lastRoomFetch = room ;

      console.log('fetch!');
// todo bug parfois (si pas de timer)

      setTimeout(() => {
        if (options.reset) {
          this.messages = this.addMessages(true,room)
        } else {
          this.messages = [...this.addMessages(false,room), ...this.messages]
          this.messagesLoaded = true
        }
        // this.addNewMessage()
      },1)
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
register()

</script>

<style lang="scss" scoped>
.window-container {
	width: 100%;
}

.window-mobile {
	form {
		padding: 0 10px 10px;
	}
}

form {
	padding-bottom: 20px;
}

input {
	padding: 5px;
	width: 140px;
	height: 21px;
	border-radius: 4px;
	border: 1px solid #d2d6da;
	outline: none;
	font-size: 14px;
	vertical-align: middle;

	&::placeholder {
		color: #9ca6af;
	}
}

button {
	background: #1976d2;
	color: #fff;
	outline: none;
	cursor: pointer;
	border-radius: 4px;
	padding: 8px 12px;
	margin-left: 10px;
	border: none;
	font-size: 14px;
	transition: 0.3s;
	vertical-align: middle;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}

	&:disabled {
		cursor: initial;
		background: #c6c9cc;
		opacity: 0.6;
	}
}

.button-cancel {
	color: #a8aeb3;
	background: none;
	margin-left: 5px;
}

select {
	vertical-align: middle;
	height: 33px;
	width: 152px;
	font-size: 13px;
	margin: 0 !important;
}
</style>
