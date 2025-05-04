import React, { type ElementType } from "react";

type StyledComponentProps = {
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: any; // Allow any additional props
};

type ComponentType = React.ForwardRefExoticComponent<
  StyledComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * Creates a set of styled components from a CSS module object.
 *
 * @example
 * ```css
 * .Card {
 *   background-color: white;
 *   border-radius: 8px;
 *   border: 1px solid #ddd;
 *   padding: 16px;
 * }
 *
 * .Title {
 *   font-size: 24px;
 *   font-weight: 600;
 * }
 *
 * .Text {
 *   font-size: 16px;
 *   color: #333;
 * }
 * ```
 *
 * ```tsx
 * import styles from "./styles.module.css";
 * import { createStyledComponents } from "./css-components";
 *
 * const { Card, Title, Text, Button }= createStyledComponents(styles);
 * ```
 *
 * @param styles - The CSS module object containing the class names.
 * @param elementMap - An optional mapping of class names to element types.
 * @returns A record of components, keyed by class name.
 */
export function cssComponents<T extends Record<string, string>>(
  styles: T,
  elementMap: Record<string, string> = {}
) {
  const components: Record<string, ComponentType> = {};

  // Process each class in the styles object using for...in
  for (const className in styles) {
    if (!Object.prototype.hasOwnProperty.call(styles, className)) continue;

    const cssClass = styles[className];

    // Skip non-string values and utility classes that start with dot
    if (typeof cssClass !== "string" || className.startsWith(".")) {
      continue;
    }

    // Create a component for this CSS class
    components[className] = React.forwardRef((props, ref) => {
      const { children, className: extraClassName, as, ...otherProps } = props;

      return React.createElement(
        as || elementMap[className] || "div",
        {
          ref,
          className: [cssClass, extraClassName].filter(Boolean).join(" "),
          ...otherProps,
        },
        children
      );
    });

    // Set the displayName property
    components[className].displayName = className;
  }

  return components;
}
