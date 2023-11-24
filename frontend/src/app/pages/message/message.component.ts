import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

declare var $: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit, AfterViewInit {
  search: any[] = [];
  users: any[] = [];
  userChat: any[] = [];
  selectedUser: any;
  todayDate: any;
  message: any = '';
  currentUser: any = localStorage.getItem('loginUser')
    ? JSON.parse(localStorage.getItem('loginUser'))
    : JSON.parse(sessionStorage.getItem('loginUser'));

  constructor(
    private authService: AuthService,
    private socketService: WebSocketService,
    private toastr: ToastrService
  ) {
    this.socketService.listen('CHAT_RECIEVE').subscribe((res: any) => {
      this.userChat.map((el) => {
        if (el.date == res.data.date) {
          el.data.push(res.data);
        }
        return el;
      });
    });
    this.socketService.listen('CHAT_PENDING').subscribe((res: any) => {
      this.userChat.map((el) => {
        if (el.date == res.data.date) {
          el.id.push(res.data.id);
        }
        return el;
      });
    });
    this.socketService.listen('LATEST_CONNECTED_USER').subscribe((res: any) => {
      this.selectedUser.id == res.user_id
        ? (this.selectedUser.isOnline = 1)
        : ``;
    });
    this.socketService
      .listen('LATEST_DISCONNECTED_USER')
      .subscribe((res: any) => {
        this.selectedUser.id == res.user_id
          ? (this.selectedUser.isOnline = 0)
          : ``;
      });
    this.socketService.listen('SERVER_ERROR').subscribe((res: any) => {
      console.log(res);
      this.toastr.info(res.message);
    });
  }

  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.authService.get('user-chat').subscribe((res) => {
      this.users = res.data;
    });
  }

  onSelectedUser(val) {
    this.users.push(val);
    this.search = [];
  }

  onChatSelectUser(val) {
    this.userChat = [];
    this.authService.get(`user-chat/${val.user_id}`).subscribe((res) => {
      this.userChat = res.data;
      console.log(res);

      this.selectedUser = { ...this.selectedUser, ...res.userData };
    });
  }

  onFilesButton() {
    document.getElementById('add-menu-icon').classList.contains('show-class')
      ? document.getElementById('add-menu-icon').classList.remove('show-class')
      : document.getElementById('add-menu-icon').classList.add('show-class');
  }

  onFileUpload($event) {
    let image = $event.target.files[0];
    let formData = new FormData();
    formData.append('file', image, image.name);
    formData.append('from_id', this.currentUser.id);
    formData.append('to_id', this.selectedUser.user_id);
    this.authService.post('chat-file', formData).subscribe((res) => {
      this.toastr.success(res.message);
    });
  }

  onSearch(val) {
    val
      ? this.authService.get(`search-users/${val}`).subscribe((res) => {
          this.search = res.data;
        })
      : ``;
  }

  onSend() {
    this.socketService.emit('CHAT_SEND', {
      from_id: this.currentUser.id,
      to_id: this.selectedUser.user_id,
      msg: this.message,
    });
  }

  ngAfterViewInit() {
    if ($(window).width() <= 991) {
      $(document).on('click', '.left-sde-body-inr', function () {
        $('.chatdiv').show();
        $('.left-sde-body').hide();
        $('.mobile-super-admin').hide();
      });
      $(document).on('click', '.mbl-text-show', function () {
        $('.chatdiv').hide();
        $('.mobile-super-admin').show();
      });

      $(document).on('click', '.respns-arrow-class', function () {
        $('.mobile-super-admin').hide();
        $('.chatdiv').show();
        $('.left-sde-body').show();
      });
    }
  }
}
