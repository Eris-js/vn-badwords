import { describe, it, expect, vi, beforeEach } from 'vitest';
import { badWords } from "./blacklist";

describe('Detect bad words', () => {
    describe('Without validation', () => {
        it('Should throw if did not receive a string', () => {
            // Make a bad input on purpose.
            const call = () => badWords(undefined as any);
            expect(call).toThrowError();
        });

        it('Should run with default blacklist if extra is not provided', () => {
            const truthy = badWords('dcm');
            expect(truthy).toEqual('***');

            const falsy = badWords('aaa');
            expect(falsy).toEqual('aaa');
        });

        it('Should run with extra blacklist if provided', () => {
            const result = badWords('alo alo', {
                blackList: ['alo'],
            });
            expect(result).toEqual('*** ***');
        });

        it('Should replace bad words with the replacement provided in options', () => {
            const result = badWords('dcm', {
                replacement: 'a',
            });
            expect(result).toEqual('aaa');
        });

        it('Should replace bad words with the replacement string provided', () => {
            const result = badWords('dcm', 'a');
            expect(result).toEqual('aaa');
        });
    });

    describe('With callback', () => {
        const callback = vi.fn((_stringArr: string[], _count: number) => {});
        beforeEach(() => {
            callback.mockRestore();
        });

        it('Callback should be called', () => {
            badWords('dmm', {}, callback);
            expect(callback).toHaveBeenCalledOnce();
        });

        it('Should not be called if none provided', () => {
            badWords('dmm', {});
            expect(callback).not.toHaveBeenCalledOnce();
        });
    });

    describe('With validation', () => {
        describe('Should return true with bad words', () => {
            it.each(['dmm', 'bà cha mày', 'bà cha mày 1', 'bà cha mày2'])('should return true', (input) => {
                const result = badWords(input, { validate: true });
                expect(result).toBeTruthy();
            });
        })

        describe('Should return false without bad words', () => {
            it.each(['alo', 'xin chào', '1235 anh có đánh rơi nhịp nào không'])('should return false', (input) => {
                const result = badWords(input, { validate: true });
                expect(result).toBeFalsy();
            });
        });
    });
});
