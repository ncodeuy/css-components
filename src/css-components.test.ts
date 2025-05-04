import { cssComponents } from "./css-components";
import { describe, expect, it } from "vitest";
import React from "react";

describe("cssComponents", () => {
  it("should return a map of class names to components", () => {
    const styles = {
      Card: "Card",
      Title: "Title",
    };

    const components = cssComponents(styles);

    for (const name in styles) {
      expect(components).toHaveProperty(name);

      const Component = components[name];
      expect(Component).toBeDefined();
    }
  });

  it("should map the classes to the elements specified in the second argument of the function", () => {});

  it("should ignore utility classes that start with dot", () => {
    const styles = { ".Card": "Card" };
    const components = cssComponents(styles);
    expect(components).not.toHaveProperty(".Card");
  });

  describe("created component", () => {
    it("should be a div element by default", () => {
      const styles = { Section: "Section", Card: "Card" };

      // With no element mapping.
      const { Section } = cssComponents(styles);
      const section = (Section as any).render({});
      expect(section.type).toBe("div");

      // With an element mapping.
      const { Card } = cssComponents(styles, { Section: "section" });
      const card = (Card as any).render({});
      expect(card.type).toBe("div");
    });

    it("should use the element type specified in the element mapping", () => {
      const { Section } = cssComponents(
        { Section: "Section" },
        { Section: "section" }
      );
      const element = (Section as any).render({});
      expect(element.type).toBe("section");
    });

    it("should have the displayName set to the component name", () => {
      const styles = { SomeComponent: "SomeComponent" };
      const { SomeComponent } = cssComponents(styles);
      expect(SomeComponent.displayName).toBe("SomeComponent");
    });

    it("should pass props to the underlying element", () => {
      const styles = { Card: "Card" };
      const { Card } = cssComponents(styles);

      const props = { title: "Test", description: "Test description" };
      const element = (Card as any).render(props);
      expect(element.props.title).toBe(props.title);
      expect(element.props.description).toBe(props.description);
    });

    it("should not replace the className prop when one is given", () => {
      const styles = { Card: "Card" };
      const { Card } = cssComponents(styles);

      const props = { className: "some-class" };
      const element = (Card as any).render(props);
      const combinedClassName = element.props.className || "";
      expect(combinedClassName).toContain(props.className);
      expect(combinedClassName).toContain("Card");
    });

    it("should pass the children to the underlying element", () => {
      const styles = { Card: "Card" };
      const { Card } = cssComponents(styles);

      const element = (Card as any).render({ children: "Test" });
      expect(element.props.children).toBe("Test");
    });
  });
});
