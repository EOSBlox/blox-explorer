import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blox-explorer`
 * A web component that gets data from the EOS blocchain
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BloxExplorer extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }
  static get properties() {
    return {
      eos: {
        type: Object
      },
    };
  }

  getAccount(accountName){
    
    return new Promise((resolve, reject) => {
      if(accountName && accountName.length >= 12) {
        return this.eos.getAccount({"account_name":accountName})
        .then((result) => {
          let account = {};
          account.created = result.created;
          account.active = result.permissions[0].required_auth.keys[0].key;
          account.owner = result.permissions[1].required_auth.keys[0].key;
          account.account_name = result.account_name;
          account.head_block_num = result.head_block_num;
          account.head_block_time = result.head_block_time;
          account.last_code_update = result.last_code_update;
          account.cpu_weight = result.cpu_weight;
          account.cpu_used = result.cpu_limit.used;
          account.cpu_available = result.cpu_limit.available;
          account.cpu_max = result.cpu_limit.max;
          account.cpu_used_sec = (result.cpu_limit.used/1000).toFixed(2);
          account.cpu_available_sec = (result.cpu_limit.available/1000).toFixed(2);
          account.cpu_max_sec = (result.cpu_limit.max/1000).toFixed(2);
          account.cpu_used_min = (account.cpu_used_sec/60).toFixed(2);
          account.cpu_available_min = (account.cpu_available_sec/60).toFixed(2);
          account.cpu_max_min = (account.cpu_max_sec/60).toFixed(2);
          account.cpu_used_hrs = (account.cpu_used_min/60).toFixed(2);
          account.cpu_available_hrs = (account.cpu_available_min/60).toFixed(2);
          account.cpu_max_hrs = (account.cpu_max_min/60).toFixed(2);
          account.net_weight = result.net_weight;
          account.net_used = result.net_limit.used;
          account.net_available = result.net_limit.available;
          account.net_max = result.net_limit.max;
          account.net_used_kb = (result.net_limit.used/1024).toFixed(2);
          account.net_available_kb = (result.net_limit.available/1024).toFixed(2);
          account.net_max_kb = (result.net_limit.max/1024).toFixed(2);
          account.net_used_mb = (account.net_used_kb/1024).toFixed(2);
          account.net_available_mb = (account.net_available_kb/1024).toFixed(2);
          account.net_max_mb = (account.net_max_kb/1024).toFixed(2);
          account.ram_quota = result.ram_quota
          account.ram_usage = result.ram_usage
          account.ram_quota_kb = (result.ram_quota/1024).toFixed(2);
          account.ram_usage_kb = (result.ram_usage/1024).toFixed(2);
          account.ram_quota_mb = (account.ram_quota_kb/1024).toFixed(2);
          account.ram_usage_mb = (account.ram_usage_kb/1024).toFixed(2);
          account.refund_request = result.refund_request;
          account.self_delegated_bandwidth = result.self_delegated_bandwidth;
          account.total_resources = result.total_resources;
          account.voter_info = result.voter_info;
          account.staked_net = result.total_resources.net_weight;
          account.staked_cpu = result.total_resources.cpu_weight;
          resolve(this.account);
        })
        .catch((error) => {
          this.error = error;
          reject(error);
        });
      }
    });
  }

} window.customElements.define('blox-explorer', BloxExplorer);
