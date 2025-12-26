"use strict";
/**
 * Request Validation Middleware
 * Validates request body, query parameters, and headers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const logger_js_1 = require("../utils/logger.js");
class ValidationMiddleware {
    /**
     * Validate request based on route configuration
     */
    validateRequest(route) {
        return (req, res, next) => {
            if (!route.validation) {
                next();
                return;
            }
            const errors = [];
            // Validate body
            if (route.validation.body) {
                const bodyErrors = this.validateObject(req.body, route.validation.body, 'body');
                errors.push(...bodyErrors);
            }
            // Validate query parameters
            if (route.validation.query) {
                const queryErrors = this.validateObject(req.query, route.validation.query, 'query');
                errors.push(...queryErrors);
            }
            // Validate headers
            if (route.validation.headers) {
                const headerErrors = this.validateObject(req.headers, route.validation.headers, 'headers');
                errors.push(...headerErrors);
            }
            if (errors.length > 0) {
                logger_js_1.Logger.warn(`Validation failed for ${route.path}:`, errors);
                res.status(400).json({
                    error: 'Validation Error',
                    message: 'Request validation failed',
                    errors
                });
                return;
            }
            next();
        };
    }
    /**
     * Validate an object against a schema
     */
    validateObject(obj, schema, prefix) {
        const errors = [];
        for (const [key, rules] of Object.entries(schema)) {
            const value = obj[key];
            const fieldPath = `${prefix}.${key}`;
            // Check required fields
            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push(`${fieldPath} is required`);
                continue;
            }
            // Skip validation if field is optional and not provided
            if (!rules.required && (value === undefined || value === null)) {
                continue;
            }
            // Type validation
            if (rules.type) {
                const expectedType = rules.type.toLowerCase();
                const actualType = Array.isArray(value) ? 'array' : typeof value;
                if (expectedType === 'array' && !Array.isArray(value)) {
                    errors.push(`${fieldPath} must be an array`);
                    continue;
                }
                if (expectedType !== 'array' && actualType !== expectedType) {
                    errors.push(`${fieldPath} must be of type ${expectedType}`);
                    continue;
                }
            }
            // String validations
            if (typeof value === 'string') {
                if (rules.minLength && value.length < rules.minLength) {
                    errors.push(`${fieldPath} must be at least ${rules.minLength} characters`);
                }
                if (rules.maxLength && value.length > rules.maxLength) {
                    errors.push(`${fieldPath} must be at most ${rules.maxLength} characters`);
                }
                if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
                    errors.push(`${fieldPath} does not match required pattern`);
                }
            }
            // Number validations
            if (typeof value === 'number') {
                if (rules.min !== undefined && value < rules.min) {
                    errors.push(`${fieldPath} must be at least ${rules.min}`);
                }
                if (rules.max !== undefined && value > rules.max) {
                    errors.push(`${fieldPath} must be at most ${rules.max}`);
                }
            }
        }
        return errors;
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map