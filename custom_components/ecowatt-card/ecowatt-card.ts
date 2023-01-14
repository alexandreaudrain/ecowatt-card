/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import type { EcoWattCardConfig } from './types';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

import { styles } from './styles';
import './editor'

/* eslint no-console: 0 */
console.info(
  `%c  ECOWATT-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ecowatt-card',
  name: 'EcoWatt Card',
  description: 'A custom card for EcoWatt',
});

// Name your custom element
@customElement('ecowatt-card')
export class EcoWattCard extends LitElement {
  public static getConfigElement() {
    return document.createElement('ecowatt-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return { name: 'EcoWatt' };
  }

  // TODO Add any properties that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public selectedDay = 0;

  @state() private config!: EcoWattCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: EcoWattCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      ...config,
    };
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    if (! this.config.entity)
      return this._showError('Entity required');
    
    if (this.hass) {
      const state = this.hass.states[this.config.entity];
      if (! state) {
        return this._showError('No state found');
      }
      if (! state.attributes) {
        return this._showError('No attribute found');
      }
      if (! state.attributes.signals) {
        return this._showError('No EcoWatt data found');
      }
    }


    this.setData();

    return html`
      <ha-card
        .header=${this.config.name}
        tabindex="0"
      >
        ${this._renderSpacer()}
        ${this._renderDays()}
        <div class="status-container">
          ${this._renderStatus()}
          ${this._renderHours()}
        </div>
        ${this._renderStyle()}
      </ha-card>
    `;
  }

  static styles = styles;

  
  private _renderSpacer(): TemplateResult {
    if (this.config.name)
      return html``;
    else
      return html`<div style='padding-top: 10px;'></div>`;
  }

  private _renderDays(): TemplateResult {
    const data = this.config.data;
    const sd = this.selectedDay;
    
    return html`
      <div class="days-container">
        <div class="day-container" @click=${() => this.selectedDay = 0}><div class="day ${'dayLevel' + data.days[0].level} ${sd == 0 ? 'focus' : ''}">${data.days[0].strDay}</div></div>
        <div class="day-container" @click=${() => this.selectedDay = 1}><div class="day ${'dayLevel' + data.days[1].level} ${sd == 1 ? 'focus' : ''}">${data.days[1].strDay}</div></div>
        <div class="day-container" @click=${() => this.selectedDay = 2}><div class="day ${'dayLevel' + data.days[2].level} ${sd == 2 ? 'focus' : ''}">${data.days[2].strDay}</div></div>
        <div class="day-container" @click=${() => this.selectedDay = 3}><div class="day ${'dayLevel' + data.days[3].level} ${sd == 3 ? 'focus' : ''}">${data.days[3].strDay}</div></div>
      </div>
    `;
  }

  private _renderStatus(): TemplateResult {
    return html`
      <div class="status">${this.config.data.days[this.selectedDay].message}</div>
    `;
  }

  private _renderHours(): TemplateResult {
    const days = this.config.data.days[this.selectedDay];
    const th = days.hours.map(
      h => html`<div class="hour ${'hourLevel' + h.level}"><div class="hourLabel">${h.step + 'h'}</div></div>`
    );

    return html`
      <div class="hours-container">
        ${th}
      </div>
    `;
  }

  private _renderStyle(): TemplateResult {
    let host = '';

    host += this.config.color1 ? '--color1: ' + this.config.color1 + ';' : '';
    host += this.config.color2 ? '--color2: ' + this.config.color2 + ';' : '';
    host += this.config.color3 ? '--color3: ' + this.config.color3 + ';' : '';

    if (host != '')
      return html`
        <style>
          ${':host {' + host + '}'}
        </style>
      `;
    else
      return html``;
  }

  private setData() {
  // mise en forme des données
    const config = this.config;
    const state = this.hass!.states[config.entity!];

    const date = new Date(state.attributes.signals[0].jour);
    const jours = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
    this.config.data = {generation: date, days: []};

    const days: any[] = [];

    // on copie les données
    for (let i = 0; i < state.attributes.signals.length; i++) {
      const signal = state.attributes.signals[i];

      const heures: any[] = [];
      for (let j = 0; j < signal.values.length; j++) {
        heures.push({
          step: signal.values[j].pas,
          level: signal.values[j].hvalue
        });
      }

      days.push({
        day: new Date(signal.jour),
        strDay: jours[new Date(signal.jour).getDay()],
        level: signal.dvalue,
        message: signal.message,
        hours: heures
      });
    }

    // et on les trie par date
    this.config.data.days = days.sort(
      (objA, objB) => objA.day.getTime() - objB.day.getTime(),
    );
  }


  private _showError(error: string): TemplateResult {
    return html`
    <ha-card tabindex="0">
      <div class="ecowatt-error">${error}</div>
    </ha-card>
    ${styles}
    `
  }

}
