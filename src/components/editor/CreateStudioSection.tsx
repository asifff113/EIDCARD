"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCardEditor } from "@/hooks/useCardEditor";
import TemplatePicker from "@/components/editor/TemplatePicker";
import TemplateExperienceEditor from "@/components/editor/TemplateExperienceEditor";

export default function CreateStudioSection({
  canEdit = true,
  authEnabled = false,
}: {
  canEdit?: boolean;
  authEnabled?: boolean;
}) {
  const router = useRouter();
  const { step, selectedTemplate, customization, selectTemplate, updateCustomization, goBack } = useCardEditor();

  function handleTemplateSelect(template: Parameters<typeof selectTemplate>[0]) {
    if (!canEdit && authEnabled) {
      router.push("/signup");
      return;
    }

    selectTemplate(template);
  }

  return (
    <section
      id="create-studio"
      className="relative z-1 min-h-screen border-t border-[rgba(212,175,55,.06)]"
      style={{ background: "linear-gradient(180deg, rgba(2,2,10,0) 0%, rgba(2,2,10,.88) 12%, #02020a 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 44% 28% at 50% 12%, rgba(201,168,76,.08), transparent), radial-gradient(ellipse 40% 26% at 16% 44%, rgba(212,175,55,.05), transparent), radial-gradient(ellipse 40% 28% at 84% 36%, rgba(212,175,55,.04), transparent)",
        }}
      />

      <div className="relative z-1">
        <AnimatePresence mode="wait">
          {step === "pick" ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
            >
              <TemplatePicker onSelect={handleTemplateSelect} />
            </motion.div>
          ) : selectedTemplate ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateExperienceEditor
                template={selectedTemplate}
                customization={customization}
                onCustomizationChange={updateCustomization}
                onBack={goBack}
                backLabel="Back to Templates"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
