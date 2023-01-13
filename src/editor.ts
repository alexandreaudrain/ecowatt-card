/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { EcoWattCardConfig } from './types';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ecowatt-card-editor')
export class EcoWattCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: EcoWattCardConfig;

  // https://github-wiki-see.page/m/thomasloven/hass-config/wiki/PreLoading-Lovelace-Elements
  static elementDefinitions = {
    "ha-card": customElements.get("ha-card"),  // This works because ha-card is ALWAYS loaded before custom cards (for now)
  };

  private _initialized = false;

  public setConfig(config: EcoWattCardConfig): void {
    this._config = config
  }

  // https://github-wiki-see.page/m/thomasloven/hass-config/wiki/PreLoading-Lovelace-Elements
  firstUpdated() {
    console.log('EDITOR : firstUpdated');
    // Elements can only be added to the local customElement registry after
    // createRenderRoot has run(which ScopedRegistryRoot handles).
    // It's definitely run before first render, so firstUpdated can be a good
    // place to start loading elements.
    this.loadEntityPicker();
  }

  async loadEntityPicker() {
    // Get the local customElement registry
    const registry = (this.shadowRoot as any)?.customElements;
    if (!registry) return;

    // Check if the element we want is already defined in the local scope
    if (registry.get("ha-entity-picker")) return;

    // Load in ha-entity-picker
    // This part will differ for every element you want
    const ch = await (window as any).loadCardHelpers();
    const c = await ch.createCardElement({ type: "entities", entities: [] });
    await c.constructor.getConfigElement();

    // Since ha-elements are not using scopedRegistry we can get a reference to
    // the newly loaded element from the global customElement registry...
    const haEntityPicker = window.customElements.get("ha-entity-picker");

    // ... and use that reference to register the same element in the local registry
    registry.define("ha-entity-picker", haEntityPicker);

    // and textfield...
    const haTextField = window.customElements.get("ha-textfield");
    registry.define("ha-textfield", haTextField);
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _name(): string {
    return this._config?.name || '';
  }
  get _entity(): string {
    return this._config?.entity || '';
  }
  get _color1(): string {
    return this._config?.color1 || '';
  }
  get _color2(): string {
    return this._config?.color2 || '';
  }
  get _color3(): string {
    return this._config?.color3 || '';
  }

  protected render(): TemplateResult | void {
    return html`
      <ha-entity-picker
        label="Entité"
        allow-custom-entity
        editable
        .hass=${this.hass}
        .value=${this._entity}
        .configValue=${'entity'}
        @value-changed=${this._valueChanged}
      ></ha-entity-picker>

      <ha-textfield
        label="Titre (Optionel)"
        .hass=${this.hass}
        .value=${this._name}
        .configValue=${'name'}
        @input=${this._valueChanged}
        style='display: flex'
      ></ha-textfield>

      <ha-textfield
        label="Couleur Situation normale (Optionnel)"
        .hass=${this.hass}
        .value=${this._color1}
        .configValue=${'color1'}
        @input=${this._valueChanged}
        style='display: flex; padding-top: 10px'
      ></ha-textfield>
      <ha-textfield
        label="Couleur Risque de coupures (Optionnel)"
        .hass=${this.hass}
        .value=${this._color2}
        .configValue=${'color2'}
        @input=${this._valueChanged}
        style='display: flex'
      ></ha-textfield>
      <ha-textfield
        label="Couleur Coupures programmées (Optionnel)"
        .hass=${this.hass}
        .value=${this._color3}
        .configValue=${'color3'}
        @input=${this._valueChanged}
        style='display: flex'
      ></ha-textfield>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    this._initialized = true;
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }
}