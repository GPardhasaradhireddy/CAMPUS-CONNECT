import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Chatbot } from "./components/Chatbot";
import { ChatbotProps } from "./types";

export class CampusChatBot implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private root: Root;
    private notifyOutputChanged: () => void;
    
    // Outputs tracking
    private lastUserMessage?: string;
    private lastBotResponse?: string;
    private uploadedFileName?: string;
    private selectedQuickAction?: string;
    private detectedComplaintCategory?: string;
    private predictedPriority?: string;
    private chatbotEvent?: string;

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.root = createRoot(this.container);
        this.renderControl(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.renderControl(context);
    }

    private renderControl(context: ComponentFramework.Context<IInputs>) {
        const props: ChatbotProps = {
            studentName: context.parameters.studentName?.raw || undefined,
            rollNumber: context.parameters.rollNumber?.raw || undefined,
            department: context.parameters.department?.raw || undefined,
            year: context.parameters.year?.raw || undefined,
            cgpa: context.parameters.cgpa?.raw || undefined,
            attendance: context.parameters.attendance?.raw || undefined,
            backlogs: context.parameters.backlogs?.raw || undefined,
            skills: context.parameters.skills?.raw ? String(context.parameters.skills.raw) : undefined,
            complaintStatus: context.parameters.complaintStatus?.raw || undefined,
            themeColor: context.parameters.themeColor?.raw || undefined,
            botName: context.parameters.botName?.raw || undefined,
            enableVoice: context.parameters.enableVoice?.raw === true,
            enableFileUpload: context.parameters.enableFileUpload?.raw === true,
            enableAvatarMode: context.parameters.enableAvatarMode?.raw === true,
            collegeName: context.parameters.collegeName?.raw || undefined,
            userRole: context.parameters.userRole?.raw || undefined,
            onUpdateOutput: this.handleOutputUpdate.bind(this)
        };

        this.root.render(React.createElement(Chatbot, props));
    }

    private handleOutputUpdate(outputs: any) {
        if (outputs.lastUserMessage !== undefined) this.lastUserMessage = outputs.lastUserMessage;
        if (outputs.lastBotResponse !== undefined) this.lastBotResponse = outputs.lastBotResponse;
        if (outputs.uploadedFileName !== undefined) this.uploadedFileName = outputs.uploadedFileName;
        if (outputs.selectedQuickAction !== undefined) this.selectedQuickAction = outputs.selectedQuickAction;
        if (outputs.detectedComplaintCategory !== undefined) this.detectedComplaintCategory = outputs.detectedComplaintCategory;
        if (outputs.predictedPriority !== undefined) this.predictedPriority = outputs.predictedPriority;
        if (outputs.chatbotEvent !== undefined) this.chatbotEvent = outputs.chatbotEvent;

        this.notifyOutputChanged();
    }

    public getOutputs(): IOutputs {
        return {
            lastUserMessage: this.lastUserMessage,
            lastBotResponse: this.lastBotResponse ? [this.lastBotResponse] : undefined, // Because Manifest types might expect an array if Multiple is used
            uploadedFileName: this.uploadedFileName,
            selectedQuickAction: this.selectedQuickAction,
            detectedComplaintCategory: this.detectedComplaintCategory,
            predictedPriority: this.predictedPriority,
            chatbotEvent: this.chatbotEvent
        } as unknown as IOutputs;
    }

    public destroy(): void {
        this.root.unmount();
    }
}