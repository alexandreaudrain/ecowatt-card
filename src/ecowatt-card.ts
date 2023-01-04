/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
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
    return {};
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
      name: 'EcoWatt',
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
      return html`
      <ha-card
        .header=${this.config.name}
        tabindex="0"
        .label=${`EcoWatt: No Entity Defined`}
      ></ha-card>
    `;
    
    if (this.hass) {
      const state = this.hass.states[this.config.entity];
      if (! state) {
        return html`
          <ha-card
            .header=${this.config.name}
            tabindex="0"
            .label=${`EcoWatt: Error`}
          ><div class="ecowatt-error">No state found</div>
          </ha-card>
        `
      }
      if (! state.attributes) {
        return html`
          <ha-card
            .header=${this.config.name}
            tabindex="0"
            .label=${`EcoWatt: Error`}
          ><div class="ecowatt-error">No attribute found</div>
          </ha-card>
        `
      }
      if (! state.attributes.signals) {
        return html`
          <ha-card
            .header=${this.config.name}
            tabindex="0"
            .label=${`EcoWatt: Error`}
          ><div class="ecowatt-error">No EcoWatt data found</div>
          </ha-card>
        `
      }
    }


    this.setData();

    return html`
      <ha-card
        .header=${this.config.name}
        tabindex="0"
        .label=${`EcoWatt: ${this.config.entity || 'No Entity Defined'}`}
      >
        ${this._renderDays()}
        <div class="status-container">
          ${this._renderStatus()}
          ${this._renderHours()}
        </div>
      </ha-card>
      ${styles}
    `;
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
    `
  }

  private _renderStatus(): TemplateResult {
    return html`
      <div class="status">${this.config.data.days[this.selectedDay].message}</div>
    `
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


  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css``;
  }
}
