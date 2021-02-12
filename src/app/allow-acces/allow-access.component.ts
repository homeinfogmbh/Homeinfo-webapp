import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-allow-access',
  templateUrl: './allow-access.component.html',
  styleUrls: ['./allow-access.component.css']
})
export class AllowAccessComponent implements OnInit {
  code: string;
  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.code = params.code;
      });
  }

  allow() {
      let formData = new FormData();
      formData.append('code', this.code);
      formData.append('grant_type', 'authorization_code');
      formData.append('client_id', localStorage.getItem('client_id'));
      formData.append('client_secret', localStorage.getItem('client_secret'));
      formData.append('redirect_uri', 'http://localhost:4200/grantAccess');
      formData.append('scope', 'comcat');
      return this.httpClient.post(
        `https://comcat.homeinfo.de/oauth/token`, formData, //url -> https://comcat.homeinfo.de/authorize
        {headers: {'Accept': 'application/x-www-form-urlencoded'}})
        .subscribe(res => {
            //console.log('accesstoken' + res);
            localStorage.setItem('ACCESS_TOKEN', res['access_token']);
            localStorage.setItem('REFRESH_TOKEN', res['refresh_token']);
            this.authService.authSubjectValue(true);
          },
          err => {
            console.log(err);
          });
  }

  refuse() {
    Swal.fire({
      title: 'Sind Sie Sicher?',
      text: 'Sie können nicht die App verwenden',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Nein, ich möchte nicht die App verwenden',
      cancelButtonText: 'Zurück'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Info',
          'sie werden jetzt zum Login zurückgeleitet',
          'info'
        ).then(x => this.router.navigate(['./login']));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
