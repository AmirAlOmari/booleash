export class FeatureToggleEntity {
  /**
   * Unique, consider PK.
   */
  public name: string;

  /**
   * Whether the feature is controlled by the
   * booleash or the check should be passed through.
   */
  public isControlled = false;

  /**
   * Whether the feature is enabled or not.
   */
  public isEnabled = false;
}
